using Caliburn.Micro;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Windows;

namespace bridge.ViewModels.MultiSpan
{
    public class MultiSpanComputeResultViewModel : Screen
    {
        private readonly IWindowManager _windowManager;
        private readonly object _parentViewModel;
        private double _windowWidth = 800;
        private double _windowHeight = 600;
        private WindowState _windowState = WindowState.Normal;
        private string _arrowSpanRatio = "0.16";
        private string _threeSectionRange = "240~300";
        private string _fiveSectionRange = "200-240";

        public MultiSpanComputeResultViewModel(IWindowManager windowManager, object parentViewModel)
        {
            _windowManager = windowManager;
            _parentViewModel = parentViewModel;
            DisplayName = "多跨桥梁计算结果";
            
            // 根据父视图模型的参数计算结果
            //CalculateResults();
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

        public string ArrowSpanRatio
        {
            get => _arrowSpanRatio;
            set
            {
                _arrowSpanRatio = value;
                NotifyOfPropertyChange(() => ArrowSpanRatio);
            }
        }

        public string ThreeSectionRange
        {
            get => _threeSectionRange;
            set
            {
                _threeSectionRange = value;
                NotifyOfPropertyChange(() => ThreeSectionRange);
            }
        }

        public string FiveSectionRange
        {
            get => _fiveSectionRange;
            set
            {
                _fiveSectionRange = value;
                NotifyOfPropertyChange(() => FiveSectionRange);
            }
        }

        /// <summary>
        /// 设置窗口大小
        /// </summary>
        public void SetWindowSize(double width, double height, WindowState state)
        {
            WindowWidth = width;
            WindowHeight = height;
            WindowState = state;
        }

        /// <summary>
        /// 根据输入参数计算结果
        /// </summary>
        private void CalculateResults()
        {
            try
            {
                // 获取父视图模型中的参数
                string threeNodeNumber = "0";
                string fiveNodeNumber = "0";
                
                // 使用类型检查获取属性值
                if (_parentViewModel is MultiSpanView2ViewModel multiSpanViewModel)
                {
                    threeNodeNumber = multiSpanViewModel.ThreeNodeNumber ?? "0";
                    fiveNodeNumber = multiSpanViewModel.FiveNodeNumber ?? "0";
                }
                else
                {
                    // 尝试使用反射获取属性
                    try
                    {
                        var threeNodeProperty = _parentViewModel.GetType().GetProperty("ThreeNodeNumber");
                        var fiveNodeProperty = _parentViewModel.GetType().GetProperty("FiveNodeNumber");
                        
                        if (threeNodeProperty != null)
                            threeNodeNumber = (threeNodeProperty.GetValue(_parentViewModel) as string) ?? "0";
                            
                        if (fiveNodeProperty != null)
                            fiveNodeNumber = (fiveNodeProperty.GetValue(_parentViewModel) as string) ?? "0";
                    }
                    catch
                    {
                        // 如果反射失败，使用默认值
                        threeNodeNumber = "5";
                        fiveNodeNumber = "4";
                    }
                }
                
                // 计算矢跨比（示例计算，实际应根据具体算法调整）
                // 多跨桥梁的计算公式可能与单跨不同，这里仅作示例
                double threeNode = double.Parse(threeNodeNumber);
                double fiveNode = double.Parse(fiveNodeNumber);
                double ratio = Math.Round(0.1 + (threeNode / fiveNode) * 0.05, 2);
                
                // 设置计算结果
                ArrowSpanRatio = ratio.ToString("0.00");
                ThreeSectionRange = $"{Math.Round(threeNode * 0.8, 0)}~{Math.Round(threeNode * 1.2, 0)}";
                FiveSectionRange = $"{Math.Round(fiveNode * 0.8, 0)}~{Math.Round(fiveNode * 1.2, 0)}";
            }
            catch (Exception ex)
            {
                // 计算出错时设置默认值
                ArrowSpanRatio = "计算错误";
                ThreeSectionRange = "计算错误";
                FiveSectionRange = "计算错误";
                
                // 可以在这里记录错误日志
                System.Diagnostics.Debug.WriteLine($"计算结果出错: {ex.Message}");
            }
        }

        /// <summary>
        /// 帮助按钮点击事件
        /// </summary>
        public async void Help()
        {
            try
            {
                // 获取当前窗口尺寸
                var currentWidth = WindowWidth;
                var currentHeight = WindowHeight;
                var currentState = WindowState;

                // 创建帮助视图模型
                var helpViewModel = IoC.Get<MultiSpanComputeResultHelpViewModel>();
                helpViewModel.SetWindowSize(currentWidth, currentHeight, WindowState.Normal);
                helpViewModel.SetParentViewModel(this);

                // 显示帮助窗口
                await _windowManager.ShowDialogAsync(helpViewModel);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"显示帮助时出错: {ex.Message}", "错误", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// 导出文档按钮点击事件
        /// </summary>
        public async Task ExportDocument()
        {
            try
            {
                // 获取父视图模型中的参数
                string threeNodeNumber = "0";
                string fiveNodeNumber = "0";
                
                // 使用类型检查获取属性值
                if (_parentViewModel is MultiSpanView2ViewModel multiSpanViewModel)
                {
                    threeNodeNumber = multiSpanViewModel.ThreeNodeNumber ?? "0";
                    fiveNodeNumber = multiSpanViewModel.FiveNodeNumber ?? "0";
                }
                else
                {
                    // 尝试使用反射获取属性
                    try
                    {
                        var threeNodeProperty = _parentViewModel.GetType().GetProperty("ThreeNodeNumber");
                        var fiveNodeProperty = _parentViewModel.GetType().GetProperty("FiveNodeNumber");
                        
                        if (threeNodeProperty != null)
                            threeNodeNumber = (threeNodeProperty.GetValue(_parentViewModel) as string) ?? "0";
                            
                        if (fiveNodeProperty != null)
                            fiveNodeNumber = (fiveNodeProperty.GetValue(_parentViewModel) as string) ?? "0";
                    }
                    catch
                    {
                        // 如果反射失败，使用默认值
                        threeNodeNumber = "5";
                        fiveNodeNumber = "4";
                    }
                }
                
                // 创建导出文件夹
                string exportDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "桥梁设计导出");
                Directory.CreateDirectory(exportDir);
                
                // 创建导出文件名
                string fileName = $"多跨桥梁计算结果_{DateTime.Now:yyyyMMdd_HHmmss}.txt";
                string filePath = Path.Combine(exportDir, fileName);
                
                // 写入计算结果
                using (StreamWriter writer = new StreamWriter(filePath))
                {
                    await writer.WriteLineAsync("中国木拱桥智能设计系统 - 多跨桥梁计算结果");
                    await writer.WriteLineAsync("===========================================");
                    await writer.WriteLineAsync($"生成时间: {DateTime.Now}");
                    await writer.WriteLineAsync($"三节点数: {threeNodeNumber}");
                    await writer.WriteLineAsync($"五节点数: {fiveNodeNumber}");
                    await writer.WriteLineAsync("-------------------------------------------");
                    await writer.WriteLineAsync($"矢跨比λ: {ArrowSpanRatio}");
                    await writer.WriteLineAsync($"三节苗平苗根径范围R1: {ThreeSectionRange}");
                    await writer.WriteLineAsync($"五节苗平苗根径范围R2: {FiveSectionRange}");
                    await writer.WriteLineAsync("===========================================");
                }
                
                // 显示导出成功消息
                MessageBox.Show($"文档已成功导出到:\n{filePath}", "导出成功", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception ex)
            {
                // 显示导出失败消息
                MessageBox.Show($"导出文档失败: {ex.Message}", "导出失败", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// 返回按钮点击事件
        /// </summary>
        public async void Back()
        {
            try
            {
                // 获取当前窗口尺寸
                var currentWidth = WindowWidth;
                var currentHeight = WindowHeight;
                var currentState = WindowState;

                // 使用反射调用父视图模型的SetWindowSize方法
                try
                {
                    var setWindowSizeMethod = _parentViewModel.GetType().GetMethod("SetWindowSize");
                    if (setWindowSizeMethod != null)
                    {
                        setWindowSizeMethod.Invoke(_parentViewModel, new object[] { currentWidth, currentHeight, currentState });
                        await _windowManager.ShowWindowAsync(_parentViewModel);
                        await TryCloseAsync();
                        return;
                    }
                }
                catch
                {
                    // 如果反射调用失败，回退到主视图
                }

                // 如果无法返回到父视图，则返回到主视图
                var mainViewModel = IoC.Get<MainViewModel>();
                mainViewModel.SetWindowSize(currentWidth, currentHeight, currentState);
                await _windowManager.ShowWindowAsync(mainViewModel);
                await TryCloseAsync();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"返回时出错: {ex.Message}", "错误", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
} 