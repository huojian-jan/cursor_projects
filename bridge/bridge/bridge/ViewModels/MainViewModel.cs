using Caliburn.Micro;
using System;
using System.Windows;
using bridge.Views;
using bridge.ViewModels.SingleSpan;
using bridge.ViewModels.MultiSpan;
using System.Threading.Tasks;

namespace bridge.ViewModels
{
    public class MainViewModel : Screen
    {
        private readonly IWindowManager _windowManager;
        private double _windowWidth = 900;
        private double _windowHeight = 600;
        private WindowState _windowState = WindowState.Normal;
        
        public MainViewModel(IWindowManager windowManager)
        {
            _windowManager = windowManager;
            DisplayName = "中国木拱桥智能设计系统";
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

        /// <summary>
        /// 选择单跨桥梁
        /// </summary>
        public async Task SelectSingleSpan()
        {
            // 获取当前窗口
            var window = GetView() as Window;
            double currentWidth = window?.ActualWidth ?? 900;
            double currentHeight = window?.ActualHeight ?? 600;
            WindowState currentState = window?.WindowState ?? WindowState.Normal;
            
            // 打开单跨桥梁设计界面
            var singleSpanViewModel = IoC.Get<SingleSpanViewModel>();
            singleSpanViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
            await _windowManager.ShowWindowAsync(singleSpanViewModel);
            
            // 隐藏当前窗口
            await TryCloseAsync();
        }

        /// <summary>
        /// 选择多跨桥梁
        /// </summary>
        public async void SelectMultiSpan()
        {
            // 获取当前窗口
            var window = GetView() as Window;
            double currentWidth = window?.ActualWidth ?? 900;
            double currentHeight = window?.ActualHeight ?? 600;
            WindowState currentState = window?.WindowState ?? WindowState.Normal;
            
            // 打开多跨桥梁设计界面
            var multiSpanViewModel = IoC.Get<MultiSpanViewModel>();
            multiSpanViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
            await _windowManager.ShowWindowAsync(multiSpanViewModel);
            
            // 隐藏当前窗口
            await TryCloseAsync();
        }
    }
} 