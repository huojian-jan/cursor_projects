using System.Windows;

namespace bridge.Views.MultiSpan
{
    /// <summary>
    /// MultiSpanView2View.xaml 的交互逻辑
    /// </summary>
    public partial class MultiSpanView2View : Window
    {
        public MultiSpanView2View()
        {
            InitializeComponent();
        }

        private void Window_StateChanged(object sender, System.EventArgs e)
        {
            // 当窗口状态改变时，通知ViewModel
            if (DataContext != null && DataContext is ViewModels.MultiSpan.MultiSpanView2ViewModel viewModel)
            {
                viewModel.WindowState = this.WindowState;
            }
        }
    }
} 