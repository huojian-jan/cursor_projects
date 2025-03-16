using System.Windows;
using bridge.ViewModels.MultiSpan;

namespace bridge.Views.MultiSpan
{
    /// <summary>
    /// MultiSpanComputeResultHelpView.xaml 的交互逻辑
    /// </summary>
    public partial class MultiSpanComputeResultHelpView : Window
    {
        public MultiSpanComputeResultHelpView()
        {
            InitializeComponent();
        }

        private void Window_StateChanged(object sender, System.EventArgs e)
        {
            // 将窗口状态变化通知给ViewModel
            if (DataContext != null && DataContext is MultiSpanComputeResultHelpViewModel viewModel)
            {
                viewModel.WindowState = this.WindowState;
            }
        }
    }
} 