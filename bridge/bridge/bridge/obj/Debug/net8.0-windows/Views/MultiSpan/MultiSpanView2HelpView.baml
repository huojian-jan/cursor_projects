   M S B A M L   `   `   `  ����A  =bridge, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null+clr-namespace:bridge.Viewsbridge.Views  5   	   3    -bridge.Views.MultiSpan.MultiSpanView2HelpView   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   ,localclr-namespace:bridge.Views     5   	   -   5          � Title$  参数说明��5   	    � 
ResizeMode$ NoResize=�5   	    � WindowStyle$ SingleBorderWindow=�5   	    � ShowInTaskbar$ False��5   	    � WindowStartupLocation$ CenterOwner=�5   	   ��5	   	   �� *WindowWidth+��5
   	   �� *WindowHeight+ � WindowState 5   	   �� *WindowState+ � 	Resources 5         StandardButtonStyle �� 
TargetType �� Property	 �� Value
 �� 
TargetType �� CornerRadius �� Triggers P� Property P� Value��%F  &	        �� 5   
   " ��6,   .�5      ��  � ��$		 150��6&   �� 5       � ��$	 45��6'   �� 5       � ��	 �#3F8C996+   �� 5       � ��
	 �����6+   �� 5       � ��$	 18(�6)   �� 5       � ��$
	 Bold"�6+   �� 5       � ��	 5      �� 5      "
 ��6&   .R�5      �� #��z��6!   #��z��5   !   #��z��5    !   $ 4��5!   !   ._�5"      �� $��Center=�6/   $��Center=�5#   /   5$       5%      P� 5&       �@J�IsMouseOver$
 True��6=   . �5'   "   ��  � ��	 �#2165706?   5(      P� 5)       � ��$
 True��6;   . �5*   "   ��  � ��	 �#1649506?   5+      P� 5,       � {�$ False��6;   . �5-   "   ��  � ��	 �#A0A0A06?   �� 5.   "    � ��	 �#E0E0E06?   5/      51      53      54      55      .��57      �� $ 5��6   
�������$��6q�61    J� Effect 58   
   3  -System.Windows.Media.Effects.DropShadowEffect  59         Color$ Black��6      
BlurRadius$ 10Q�6-      ShadowDepth$ 0Q�6=      Opacity$	 0.5Q�6M   ._�5;   
   �  � RowDefinitions 5<      �� 5=      $��50 �6    �� 5>      $��* �6    �� 5?      $��40 �6    .+�5C      �� $��0��6   ���#3F8C99$ 5,5,0,0��67   ._�5D      �� $��参数说明��6   $��24(�5E      $
��Bold"�5F      
�������$��Center=�5H      $��Center=�5I      5J      � 5M      $��1��6   ���#E4F2F5.+�5O      �� $
��Auto=�6   $��50,20q�6B   .��5P      �� .+�5Q      �� $(��"本界面输入数据应为整数;��6$   $��24(�5R   $   $
��Bold"�5S   $   $��	0,10,0,30q�5T   $   �� 5V      $^��X三节苗指由一平二斜三根等长的拱杆形成的系统，其数目宜为单数;��6$   $��24(�5W   $   $
��Wrap=�5X   $   $��0,0,0,30q�5Y   $   �� 5[      $g��a五节苗指一横四斜五根拱杆形成的系统，其数目应等于三节苗数目减去1。��6$   $��24(�5\   $   $
��Wrap=�5]   $   $��0,0,0,30q�5^   $   5_      5`      �� 5c      -   5         ��Name$
 Back��5c      $��关闭��5d      $	��120��5e      $��40��5f      #��[  5g      $��Center=�5h      $��Bottom=�5i      $��0,0,0,20q�5j      5k      �� 5n      $��2��6   ���#3F8C99$ 0,0,5,5��67   ._�5o      �� $A��;版权所有 © 2023-2024 中国木拱桥智能设计系统��6   $��Center=�5p      $��Center=�5q      
�������$��12(�5s      5t      5u      5v      5w      