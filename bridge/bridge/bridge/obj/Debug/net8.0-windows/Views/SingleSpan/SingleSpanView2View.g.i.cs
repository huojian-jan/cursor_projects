﻿#pragma checksum "..\..\..\..\..\Views\SingleSpan\SingleSpanView2View.xaml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "D9C3F4379AA3CE8A10854352034C9D63BD8BA70B"
//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.42000
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Controls.Ribbon;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;
using bridge.Views;


namespace bridge.Views.SingleSpan {
    
    
    /// <summary>
    /// SingleSpanView2View
    /// </summary>
    public partial class SingleSpanView2View : System.Windows.Window, System.Windows.Markup.IComponentConnector {
        
        
        #line 181 "..\..\..\..\..\Views\SingleSpan\SingleSpanView2View.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox ThreeNodeNumber;
        
        #line default
        #line hidden
        
        
        #line 200 "..\..\..\..\..\Views\SingleSpan\SingleSpanView2View.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox FiveNodeNumber;
        
        #line default
        #line hidden
        
        
        #line 213 "..\..\..\..\..\Views\SingleSpan\SingleSpanView2View.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button Help;
        
        #line default
        #line hidden
        
        
        #line 219 "..\..\..\..\..\Views\SingleSpan\SingleSpanView2View.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button Confirm;
        
        #line default
        #line hidden
        
        
        #line 233 "..\..\..\..\..\Views\SingleSpan\SingleSpanView2View.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button Back;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "9.0.3.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/bridge;component/views/singlespan/singlespanview2view.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\..\..\..\Views\SingleSpan\SingleSpanView2View.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "9.0.3.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            
            #line 12 "..\..\..\..\..\Views\SingleSpan\SingleSpanView2View.xaml"
            ((bridge.Views.SingleSpan.SingleSpanView2View)(target)).StateChanged += new System.EventHandler(this.Window_StateChanged);
            
            #line default
            #line hidden
            return;
            case 2:
            this.ThreeNodeNumber = ((System.Windows.Controls.TextBox)(target));
            return;
            case 3:
            this.FiveNodeNumber = ((System.Windows.Controls.TextBox)(target));
            return;
            case 4:
            this.Help = ((System.Windows.Controls.Button)(target));
            return;
            case 5:
            this.Confirm = ((System.Windows.Controls.Button)(target));
            return;
            case 6:
            this.Back = ((System.Windows.Controls.Button)(target));
            return;
            }
            this._contentLoaded = true;
        }
    }
}

