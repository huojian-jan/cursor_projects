using System.Windows;
using bridge.ViewModels.MultiSpan;

namespace bridge.Views.MultiSpan
{
    /// <summary>
    /// MultiSpanHelpView.xaml 的交互逻辑
    /// </summary>
    public partial class MultiSpanHelpView : Window
    {
        public MultiSpanHelpView()
        {
            InitializeComponent();
        }

        private void Window_StateChanged(object sender, System.EventArgs e)
        {
            // 当窗口状态改变时，通知ViewModel
            if (DataContext != null && DataContext is MultiSpanHelpViewModel viewModel)
            {
                viewModel.WindowState = this.WindowState;
            }
        }
    }
} 