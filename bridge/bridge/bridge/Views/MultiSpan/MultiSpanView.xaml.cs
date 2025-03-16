using System;
using System.Windows;

namespace bridge.Views.MultiSpan
{
    /// <summary>
    /// MultiSpanView.xaml 的交互逻辑
    /// </summary>
    public partial class MultiSpanView : Window
    {
        public MultiSpanView()
        {
            InitializeComponent();
        }

        /// <summary>
        /// 处理窗口状态改变事件
        /// </summary>
        private void Window_StateChanged(object sender, EventArgs e)
        {
            // 当窗口从最大化状态恢复到正常状态时，将其位置设置为屏幕中央
            if (WindowState == WindowState.Normal)
            {
                // 计算屏幕中央位置
                double screenWidth = SystemParameters.PrimaryScreenWidth;
                double screenHeight = SystemParameters.PrimaryScreenHeight;
                double windowWidth = Width;
                double windowHeight = Height;

                Left = (screenWidth - windowWidth) / 2;
                Top = (screenHeight - windowHeight) / 2;
            }
        }
    }
} 