﻿#pragma checksum "..\..\..\..\..\Views\MultiSpan\MultiSpanComputeResultView.xaml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "B43D8584CD847F30CA6272A36341009E61168E4C"
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
using bridge.Views.MultiSpan;


namespace bridge.Views.MultiSpan {
    
    
    /// <summary>
    /// MultiSpanComputeResultView
    /// </summary>
    public partial class MultiSpanComputeResultView : System.Windows.Window, System.Windows.Markup.IComponentConnector {
        
        
        #line 110 "..\..\..\..\..\Views\MultiSpan\MultiSpanComputeResultView.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button Help;
        
        #line default
        #line hidden
        
        
        #line 114 "..\..\..\..\..\Views\MultiSpan\MultiSpanComputeResultView.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button ExportDocument;
        
        #line default
        #line hidden
        
        
        #line 118 "..\..\..\..\..\Views\MultiSpan\MultiSpanComputeResultView.xaml"
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
            System.Uri resourceLocater = new System.Uri("/bridge;component/views/multispan/multispancomputeresultview.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\..\..\..\Views\MultiSpan\MultiSpanComputeResultView.xaml"
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
            
            #line 14 "..\..\..\..\..\Views\MultiSpan\MultiSpanComputeResultView.xaml"
            ((bridge.Views.MultiSpan.MultiSpanComputeResultView)(target)).StateChanged += new System.EventHandler(this.Window_StateChanged);
            
            #line default
            #line hidden
            return;
            case 2:
            this.Help = ((System.Windows.Controls.Button)(target));
            return;
            case 3:
            this.ExportDocument = ((System.Windows.Controls.Button)(target));
            return;
            case 4:
            this.Back = ((System.Windows.Controls.Button)(target));
            return;
            }
            this._contentLoaded = true;
        }
    }
}

