using Caliburn.Micro;
using System;
using System.Windows;

namespace bridge.ViewModels.MultiSpan
{
    public class MultiSpanViewModel : Screen
    {
        private string _spanLength;
        private string _bridgeWidth;
        private string _spanCount;
        private readonly IWindowManager _windowManager;
        private double _windowWidth = 900;
        private double _windowHeight = 600;
        private WindowState _windowState = WindowState.Normal;

        public MultiSpanViewModel(IWindowManager windowManager)
        {
            _windowManager = windowManager;
            DisplayName = "多跨桥梁设计";
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

        public string SpanLength
        {
            get => _spanLength;
            set
            {
                _spanLength = value;
                NotifyOfPropertyChange(() => SpanLength);
                NotifyOfPropertyChange(() => CanConfirm);
            }
        }

        public string BridgeWidth
        {
            get => _bridgeWidth;
            set
            {
                _bridgeWidth = value;
                NotifyOfPropertyChange(() => BridgeWidth);
                NotifyOfPropertyChange(() => CanConfirm);
            }
        }

        public string SpanCount
        {
            get => _spanCount;
            set
            {
                _spanCount = value;
                NotifyOfPropertyChange(() => SpanCount);
                NotifyOfPropertyChange(() => CanConfirm);
            }
        }

        public bool CanConfirm
        {
            get
            {
                // 验证输入是否有效（必须是有效的数字）
                bool isSpanLengthValid = !string.IsNullOrWhiteSpace(SpanLength) && 
                                        double.TryParse(SpanLength, out double spanLength) && 
                                        spanLength > 0;
                
                bool isBridgeWidthValid = !string.IsNullOrWhiteSpace(BridgeWidth) && 
                                        double.TryParse(BridgeWidth, out double bridgeWidth) && 
                                        bridgeWidth > 0;

                bool isSpanCountValid = !string.IsNullOrWhiteSpace(SpanCount) && 
                                       int.TryParse(SpanCount, out int spanCount) && 
                                       spanCount > 1; // 多跨至少需要2跨
                
                return isSpanLengthValid && isBridgeWidthValid && isSpanCountValid;
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
            var helpViewModel = new MultiSpanHelpViewModel(_windowManager, this);
            helpViewModel.SetWindowSize(currentWidth, currentHeight, currentState);

            // 显示模态帮助窗口
            await _windowManager.ShowDialogAsync(helpViewModel);
        }

        public async void Confirm()
        {
            if (CanConfirm)
            {
                // 获取当前窗口
                var window = GetView() as Window;
                double currentWidth = window?.ActualWidth ?? 900;
                double currentHeight = window?.ActualHeight ?? 600;
                WindowState currentState = window?.WindowState ?? WindowState.Normal;
                
                // 创建MultiSpanView2ViewModel
                var multiSpanView2ViewModel = IoC.Get<MultiSpanView2ViewModel>();
                
                // 传递窗口大小和状态
                multiSpanView2ViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
                
                // 打开新窗口
                await _windowManager.ShowWindowAsync(multiSpanView2ViewModel);
                
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
                // 这里可以根据实际需求实现导航逻辑
            }
            else
            {
                MessageBox.Show("请先完成并确认当前参数设置", "系统提示", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }

        public async void Back()
        {
            // 获取当前窗口
            var window = GetView() as Window;
            double currentWidth = window?.ActualWidth ?? 900;
            double currentHeight = window?.ActualHeight ?? 600;
            WindowState currentState = window?.WindowState ?? WindowState.Normal;
            
            // 获取MainViewModel实例
            var mainViewModel = IoC.Get<MainViewModel>();
            mainViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
            
            // 打开主界面
            await _windowManager.ShowWindowAsync(mainViewModel);
            
            // 关闭当前界面
            await TryCloseAsync();
        }
    }
} 