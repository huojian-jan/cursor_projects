using Caliburn.Micro;
using System;
using System.Threading.Tasks;
using System.Windows;

namespace bridge.ViewModels.SingleSpan
{
    public class SingleSpanView2ViewModel : Screen
    {
        private string _threeNodeNumber;
        private string _fiveNodeNumber;
        private readonly IWindowManager _windowManager;
        private double _windowWidth = 900;
        private double _windowHeight = 600;
        private WindowState _windowState = WindowState.Normal;

        public SingleSpanView2ViewModel(IWindowManager windowManager)
        {
            _windowManager = windowManager;
            DisplayName = "单跨桥梁设计参数";
        }

        public string ThreeNodeNumber
        {
            get => _threeNodeNumber;
            set
            {
                _threeNodeNumber = value;
                NotifyOfPropertyChange(() => ThreeNodeNumber);
                NotifyOfPropertyChange(() => CanConfirm);
            }
        }

        public string FiveNodeNumber
        {
            get => _fiveNodeNumber;
            set
            {
                _fiveNodeNumber = value;
                NotifyOfPropertyChange(() => FiveNodeNumber);
                NotifyOfPropertyChange(() => CanConfirm);
            }
        }

        public double WindowWidth
        {
            get => _windowWidth;
            set
            {
                _windowWidth = value;
                NotifyOfPropertyChange(() => WindowWidth);
            }
        }

        public double WindowHeight
        {
            get => _windowHeight;
            set
            {
                _windowHeight = value;
                NotifyOfPropertyChange(() => WindowHeight);
            }
        }

        public WindowState WindowState
        {
            get => _windowState;
            set
            {
                _windowState = value;
                NotifyOfPropertyChange(() => WindowState);
            }
        }

        /// <summary>
        /// 设置窗口大小和状态
        /// </summary>
        public void SetWindowSize(double width, double height, WindowState state = WindowState.Normal)
        {
            WindowWidth = width;
            WindowHeight = height;
            WindowState = state;
        }

        public bool CanConfirm
        {
            get
            {
                // 验证输入是否有效（必须是有效的数字）
                bool isThreeNodeNumberValid = !string.IsNullOrWhiteSpace(ThreeNodeNumber) && 
                                             int.TryParse(ThreeNodeNumber, out int threeNodeNumber) && 
                                             threeNodeNumber > 0;
                
                bool isFiveNodeNumberValid = !string.IsNullOrWhiteSpace(FiveNodeNumber) && 
                                           int.TryParse(FiveNodeNumber, out int fiveNodeNumber) && 
                                           fiveNodeNumber > 0;
                
                return isThreeNodeNumberValid && isFiveNodeNumberValid;
            }
        }

        public async void Help()
        {
            // 获取当前窗口
            var window = GetView() as Window;
            double currentWidth = window?.ActualWidth ?? 900;
            double currentHeight = window?.ActualHeight ?? 600;
            WindowState currentState = window?.WindowState ?? WindowState.Normal;
            
            // 创建帮助视图模型
            var helpViewModel = new SingleSpanView2HelpViewModel(_windowManager, this);
            helpViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
            
            // 显示模态帮助窗口
            await _windowManager.ShowDialogAsync(helpViewModel);
        }

        public async Task Confirm()
        {
            if (CanConfirm)
            {
                // 获取当前窗口
                var window = GetView() as Window;
                double currentWidth = window?.ActualWidth ?? 900;
                double currentHeight = window?.ActualHeight ?? 600;
                WindowState currentState = window?.WindowState ?? WindowState.Normal;
                
                // 创建计算视图模型
                var computingViewModel = new SingleSpanComputingViewModel(_windowManager, this);
                computingViewModel.SetWindowSize(currentWidth, currentHeight, currentState);

                // 隐藏当前窗口，但不关闭
                window.Hide();
                
                // 显示计算窗口
                await _windowManager.ShowWindowAsync(computingViewModel);
                
                // 注意：ShowWindowAsync不会等待窗口关闭，所以这里不应该继续执行
                // 计算完成后，SingleSpanComputingViewModel会自行创建并显示结果窗口
                // 然后关闭自己，所以我们只需要在这里关闭当前窗口即可
                
                // 关闭当前窗口
                await TryCloseAsync();
            }
        }

        public void Next()
        {
            if (CanConfirm)
            {
                // 保存数据并进入下一步
                MessageBox.Show("进入下一步设计", "系统提示", MessageBoxButton.OK, MessageBoxImage.Information);
                
                // TODO: 导航到下一个视图或关闭当前视图
            }
            else
            {
                MessageBox.Show("请先完成并确认当前参数设置", "系统提示", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }

        public void Back()
        {
            // 获取当前窗口
            var window = GetView() as Window;
            double currentWidth = window?.ActualWidth ?? 900;
            double currentHeight = window?.ActualHeight ?? 600;
            WindowState currentState = window?.WindowState ?? WindowState.Normal;
            
            // 获取SingleSpanViewModel实例
            var singleSpanViewModel = IoC.Get<SingleSpanViewModel>();
            singleSpanViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
            
            // 打开SingleSpanView
            _windowManager.ShowWindowAsync(singleSpanViewModel);
            
            // 关闭当前界面
            TryCloseAsync();
        }
    }
} 