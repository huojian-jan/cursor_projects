using bridge.ViewModels.SingleSpan;
using Caliburn.Micro;
using System;
using System.Threading.Tasks;
using System.Windows;

namespace bridge.ViewModels.MultiSpan
{
    public class MultiSpanView2ViewModel : Screen
    {
        private string _threeNodeNumber;
        private string _fiveNodeNumber;
        private readonly IWindowManager _windowManager;
        private double _windowWidth = 900;
        private double _windowHeight = 600;
        private WindowState _windowState = WindowState.Normal;
        private readonly MultiSpanViewModel _parentViewModel;

        public MultiSpanView2ViewModel(IWindowManager windowManager)
        {
            _windowManager = windowManager;
            DisplayName = "多跨桥梁设计参数";
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

        /// <summary>
        /// 帮助按钮点击事件
        /// </summary>
        public async void Help()
        {
            // 获取当前窗口
            var window = GetView() as Window;
            double currentWidth = window?.ActualWidth ?? 900;
            double currentHeight = window?.ActualHeight ?? 600;
            WindowState currentState = window?.WindowState ?? WindowState.Normal;
            
            // 创建帮助视图模型
            var helpViewModel = new MultiSpanView2HelpViewModel(_windowManager, this);
            helpViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
            
            // 显示帮助窗口（模态）
            await _windowManager.ShowDialogAsync(helpViewModel);
        }

        /// <summary>
        /// 确认按钮点击事件
        /// </summary>
        public async void Confirm()
        {
            if (CanConfirm)
            {
                // 获取当前窗口
                var window = GetView() as Window;
                double currentWidth = window?.ActualWidth ?? 900;
                double currentHeight = window?.ActualHeight ?? 600;
                WindowState currentState = window?.WindowState ?? WindowState.Normal;

                // 创建计算视图模型，复用SingleSpanComputingViewModel
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

        /// <summary>
        /// 返回按钮点击事件
        /// </summary>
        public async void Back()
        {
            // 获取当前窗口
            var window = GetView() as Window;
            double currentWidth = window?.ActualWidth ?? 900;
            double currentHeight = window?.ActualHeight ?? 600;
            WindowState currentState = window?.WindowState ?? WindowState.Normal;
            
            // 获取MultiSpanViewModel实例
            var multiSpanViewModel = IoC.Get<MultiSpanViewModel>();
            multiSpanViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
            
            // 显示多跨桥梁设计界面
            await _windowManager.ShowWindowAsync(multiSpanViewModel);
            
            // 关闭当前窗口
            await TryCloseAsync();
        }
    }
} 