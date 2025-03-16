using System;
using System.Windows;
using Caliburn.Micro;
using bridge.Views.MultiSpan;

namespace bridge.ViewModels.MultiSpan
{
    public class MultiSpanComputeResultHelpViewModel : Screen
    {
        private readonly IWindowManager _windowManager;
        private Screen _parentViewModel;

        // 窗口属性
        private double _windowWidth = 700;
        private double _windowHeight = 500;
        private WindowState _windowState = WindowState.Normal;

        public MultiSpanComputeResultHelpViewModel(IWindowManager windowManager)
        {
            _windowManager = windowManager;
            DisplayName = "多跨桥梁计算结果帮助";
        }

        // 设置父视图模型，用于在OnViewLoaded中获取父窗口
        public void SetParentViewModel(Screen parentViewModel)
        {
            _parentViewModel = parentViewModel;
        }

        // 窗口宽度
        public double WindowWidth
        {
            get { return _windowWidth; }
            set
            {
                _windowWidth = value;
                NotifyOfPropertyChange(() => WindowWidth);
            }
        }

        // 窗口高度
        public double WindowHeight
        {
            get { return _windowHeight; }
            set
            {
                _windowHeight = value;
                NotifyOfPropertyChange(() => WindowHeight);
            }
        }

        // 窗口状态
        public WindowState WindowState
        {
            get { return _windowState; }
            set
            {
                _windowState = value;
                NotifyOfPropertyChange(() => WindowState);
            }
        }

        protected override void OnViewLoaded(object view)
        {
            base.OnViewLoaded(view);

            if (_parentViewModel != null && view is Window modalWindow)
            {
                try
                {
                    // 获取父窗口
                    var getViewMethod = _parentViewModel.GetType().GetMethod("GetView");
                    if (getViewMethod != null)
                    {
                        var parentWindow = _parentViewModel.GetView() as Window;
                        if (parentWindow != null)
                        {
                            modalWindow.Width = parentWindow.ActualWidth * 0.8;
                            modalWindow.Height = parentWindow.ActualHeight * 0.8;

                            // 计算位置差异，使模态窗口居中显示
                            var dxWidth = parentWindow.ActualWidth - modalWindow.ActualWidth;
                            var dxHeight = parentWindow.ActualHeight - modalWindow.ActualHeight;

                            // 设置模态窗口位置
                            modalWindow.Left = parentWindow.Left + dxWidth * 0.5;
                            modalWindow.Top = parentWindow.Top + dxHeight * 0.5;
                        }
                    }

                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine($"设置模态窗口位置出错: {ex.Message}");
                }
            }
        }

        // 设置窗口大小
        public void SetWindowSize(double width, double height, WindowState state)
        {
            // 设置为父窗口的80%大小
            WindowWidth = width * 0.8;
            WindowHeight = height * 0.8;
            WindowState = WindowState.Normal; // 模态窗口始终为Normal状态
        }

        // 返回按钮点击事件
        public async void Back()
        {
            await TryCloseAsync();
        }
    }
} 