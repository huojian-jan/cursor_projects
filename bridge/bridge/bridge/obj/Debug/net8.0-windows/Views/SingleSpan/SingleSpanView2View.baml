   M S B A M L   `   `   `  ����A  =bridge, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null+clr-namespace:bridge.Viewsbridge.Views  5   	   1    +bridge.Views.SingleSpan.SingleSpanView2View   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   ,localclr-namespace:bridge.Views     5   	   -   5          � Title$  单跨桥梁设计参数��5   	   $	��500��5   	   $	��700��6    � WindowStartupLocation$ CenterScreen=�5   	   ��5	   	   �� *WindowWidth+��5
   	   �� *WindowHeight+ � WindowState 5   	   �� *WindowState+ � 	Resources 5         StandardButtonStyle �� 
TargetType �� Property �� Value �� 
TargetType �� CornerRadius	 �� Triggers
 P� Property P� Value  CircleButtonStyle  InputTextBoxStyle ��Name
 � Tag ��Name �� 
TargetName��%�	  &	        &	 <    &	 �    �� 5   
   " ��6,   .�5      ��  � ��$	 150��6&   �� 5       � ��$ 45��6'   �� 5       � �� �#2a7d8c6+   �� 5       � ��
 �����6+   �� 5       � ��$ 18(�6)   �� 5       � ��$
 Bold"�6+   �� 5       � �� 5      �� 5      " ��6&   .R�5      �� #��z��6!   #��z��5   !   #��z��5   !   $ 0��5   !   ._�5       �� $��Center=�6/   $��Center=�5!   /   5"      	 5#      P� 5$      
 �@J�IsMouseOver$
 True��6=   . �5%   "   ��  � �� �#3a8d9c6?   5&      P� 5'      
 � ��$
 True��6;   . �5(   "   ��  � �� �#1a6d7c6?   5)      P� 5*      
 � {�$ False��6;   . �5+   "   ��  � �� �#A0A0A06?   �� 5,   "    � �� �#E0E0E06?   5-      5/      51      52      �� 55   
   " ��6*   .�56      ��  � ��$ 50��6&   �� 57       � ��$ 50��6'   �� 58       � �� �#3F8C996+   �� 59       � ��
 �����6+   �� 5:       � ��$ 24(�6)   �� 5;       � ��$
 Bold"�6+   �� 5<       � �� 5=      �� 5>      " ��6&   .R�5?      �� #��z��6!   #��z��5@   !   #��z��5A   !   $ 25��5B   !   ._�5C      �� $��Center=�6/   $��Center=�5D   /   5E      	 5F      P� 5G      
 �@J�IsMouseOver$
 True��6=   . �5H   "   ��  � �� �#2165706?   5I      P� 5J      
 � ��$
 True��6;   . �5K   "   ��  � �� �#1649506?   5L      5N      5P      5Q      �� 5T   
   " ��6*   .�5U      ��  � ��$ 40��6'   �� 5V       � ��$ 16(�6)   �� 5W       � ��$ 1q�60   �� 5X       � ��$	 5,2q�6(   �� 5Y       � �� �#AAAAAA6,   �� 5Z       � ��$ Center=�69   �� 5[       � �� 5\      �� 5]      " ��6&   .R�5^      �� #��z��6!   #��z��5_   !   #��z��5`   !   $ 4��5a   !   ._�5b      � .+�5c   "   �� $ WatermarkText��6,   #��z 5d   ,   $y�	Collapsed=�5e   ,   
�������$��5,0,0,0q�5g   ,   $��Center=�5h   ,   �� 5i   "   $ PART_ContentHost��6/   $��5,0,0,0q�5j   +   $��Center=�5k   +   5l      5m      	 5n      P� 5o      
 � ��$  ��66   . �5p   "   �� $ WatermarkText��6O    � y�$ Visible=�6?   6O   5q      P� 5r      
 �@J�IsKeyboardFocused$
 True��6C   . �5s   "   ��  � �� �#3F8C996@   5t      5v      5x      5y      5z      .��5|      �  � RowDefinitions 5}   
   �� 5~      $	��120 �6   �� 5      $��* �6   �� 5�      $��40 �6   .+�5�   
   �� $��0��6   ���#3F8C99._�5�      �  � ColumnDefinitions 5�      �� 5�      $
��Auto �6'   �� 5�      $��* �6'   .+�5�      �� $��0��6   $1��+/bridge;component/Resources/bridge_logo.png��5�      $	��160��5�      $��70��5�      $��20,0,0,0q�5�      $��Center=�5�      $
��Left=�5�      �� 5�      $��1��6   $'��!中国木拱桥智能设计系统��5�      $��48(�5�      $
��Bold"�5�      
�������$��Center=�5�      $��Center=�5�       J� Effect 5�      3  -System.Windows.Media.Effects.DropShadowEffect  5�         ShadowDepth$ 3Q�6+      Color$ White��6;      Opacity$	 0.7Q�6I      
BlurRadius$ 5Q�6W   5�      5�      5�      � 5�   
   $��1��6   ���#E4F2F5.+�5�      �� $��Center=�6   $��Center=�64   $	��400��6Q   .+�5�      � $
��0,20q�6    5�      �� 5�      $	��220 �6+   �� 5�      $��* �6+   .+�5�      �� $��0��6    $��三节苗数目N1��5�       $��24(�5�       $
��Bold"�5�       $��Center=�5�       �� 5�      -   5         ��Name$ ThreeNodeNumber��5�      $��1��5�      $ 请输入整数��5�      #��[ 5�      5�      � 5�      $
��0,20q�6    5�      �� 5�      $	��220 �6+   �� 5�      $��* �6+   .+�5�      �� $��0��6    $��五节苗数目N2��5�       $��24(�5�       $
��Bold"�5�       $��Center=�5�       �� 5�      -   5        $ FiveNodeNumber��5�      $��1��5�      $ 请输入整数��5�      #��[ 5�      5�      � 5�      $��0,40,0,0q�6    5�      �� 5�      $��* �6+   �� 5�      $��* �6+   .+�5�      �� -   5         ��Name$
 Help��5�      $��0��5�      $��帮助��5�      #��[  5�      $��Center=�5�      �� 5�      -   5        $ Confirm��5�      $��1��5�      $��确认��5�      #��[  5�      $��Center=�5�      {�5�      �� *
CanConfirm+5�      5�      5�      �� 5�       �� Orientation$ 
Horizontal=�6   $��Right=�5�      $��Bottom=�5�      $��	0,0,20,20q�5�      .+�5�      �� -   5        $
 Back��5�      $��返回��5�      $	��100��5�      $��45��5�      #��[  5�      5�      5�      �� 5�   
   $��2��6   ���#3F8C99._�5�      �� $A��;版权所有 © 2023-2024 中国木拱桥智能设计系统��6   $��Center=�5�      $��Center=�5�      
�������$��12(�5�      5�      5�      5�      