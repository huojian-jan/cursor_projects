using Caliburn.Micro;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using bridge.ViewModels.MultiSpan;

namespace bridge.ViewModels.SingleSpan
{
    public class SingleSpanComputingViewModel : Screen
    {
        private readonly IWindowManager _windowManager;
        private double _windowWidth = 900;
        private double _windowHeight = 600;
        private WindowState _windowState = WindowState.Normal;
        private readonly object _parentViewModel;
        private CancellationTokenSource _cts;

        public SingleSpanComputingViewModel(IWindowManager windowManager, object parentViewModel)
        {
            _windowManager = windowManager;
            _parentViewModel = parentViewModel;
            DisplayName = "计算中";
            _cts = new CancellationTokenSource();
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
        /// 开始计算过程
        /// </summary>
        public async Task StartComputing()
        {
            try
            {
                // 随机生成3-6秒的延迟，模拟计算过程
                Random random = new Random();
                int delayTime = random.Next(3000, 6001);
                await Task.Delay(delayTime, _cts.Token);
                
                // 获取当前窗口
                var window = GetView() as Window;
                double currentWidth = window?.ActualWidth ?? 900;
                double currentHeight = window?.ActualHeight ?? 600;
                WindowState currentState = window?.WindowState ?? WindowState.Normal;
                
                // 根据父视图模型类型创建不同的结果视图模型
                if (_parentViewModel is MultiSpan.MultiSpanView2ViewModel)
                {
                    // 如果是多跨桥梁，创建多跨计算结果视图模型
                    var resultViewModel = new MultiSpan.MultiSpanComputeResultViewModel(_windowManager, _parentViewModel);
                    resultViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
                    
                    // 显示结果窗口
                    await _windowManager.ShowWindowAsync(resultViewModel);
                }
                else
                {
                    // 如果是单跨桥梁，创建单跨计算结果视图模型
                    var resultViewModel = new SingleSpanComputeResultViewModel(_windowManager, _parentViewModel);
                    resultViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
                    
                    // 显示结果窗口
                    await _windowManager.ShowWindowAsync(resultViewModel);
                }
                
                // 关闭计算窗口
                await TryCloseAsync();
            }
            catch (TaskCanceledException)
            {
                // 任务被取消，不做任何处理
            }
        }

        protected override void OnViewLoaded(object view)
        {
            base.OnViewLoaded(view);
            
            // 视图加载完成后，自动开始计算
            _ = StartComputing();
        }

        protected override Task OnDeactivateAsync(bool close, CancellationToken cancellationToken)
        {
            if (close)
            {
                // 取消正在进行的计算任务
                _cts.Cancel();
                _cts.Dispose();
            }
            
            return base.OnDeactivateAsync(close, cancellationToken);
        }
    }
} 