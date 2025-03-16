using Caliburn.Micro;
using System;
using System.Windows;
using bridge.Views.MultiSpan;

namespace bridge.ViewModels.MultiSpan
{
    public class MultiSpanView2HelpViewModel : Screen
    {
        private readonly IWindowManager _windowManager;
        private Screen _parentViewModel;
        private double _windowWidth = 900;
        private double _windowHeight = 600;
        private WindowState _windowState = WindowState.Normal;

        public MultiSpanView2HelpViewModel(IWindowManager windowManager, Screen parentViewModel)
        {
            _windowManager = windowManager;
            _parentViewModel = parentViewModel;
            DisplayName = "参数说明";
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

        /// <summary>
        /// 设置窗口大小和状态
        /// </summary>
        public void SetWindowSize(double width, double height, WindowState state = WindowState.Normal)
        {
            // 设置为父窗口的80%大小
            WindowWidth = width * 0.8;
            WindowHeight = height * 0.8;
            WindowState = WindowState.Normal; // 模态窗口始终为Normal状态
        }

        /// <summary>
        /// 返回按钮
        /// </summary>
        public void Back()
        {
            // 关闭当前帮助窗口
            TryCloseAsync();
        }
    }
} 