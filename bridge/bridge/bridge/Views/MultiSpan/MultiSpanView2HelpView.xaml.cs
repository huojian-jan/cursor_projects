using System.Windows;
using bridge.ViewModels.MultiSpan;

namespace bridge.Views.MultiSpan
{
    /// <summary>
    /// MultiSpanView2HelpView.xaml 的交互逻辑
    /// </summary>
    public partial class MultiSpanView2HelpView : Window
    {
        public MultiSpanView2HelpView()
        {
            InitializeComponent();
        }

        private void Window_StateChanged(object sender, System.EventArgs e)
        {
            // 当窗口状态改变时，通知ViewModel
            if (DataContext != null && DataContext is MultiSpanView2HelpViewModel viewModel)
            {
                viewModel.WindowState = this.WindowState;
            }
        }
    }
} 