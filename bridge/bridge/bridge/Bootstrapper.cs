using System.Windows;
using bridge.ViewModels;
using bridge.ViewModels.MultiSpan;
using bridge.ViewModels.SingleSpan;
using Caliburn.Micro;

namespace bridge
{
    public class Bootstrapper : BootstrapperBase
    {
        private SimpleContainer _container = new SimpleContainer();

        public Bootstrapper()
        {
            Initialize();
        }

        protected override void Configure()
        {
            _container.Instance(_container);
            _container.Singleton<IWindowManager, WindowManager>();
            _container.Singleton<IEventAggregator, EventAggregator>();

            // Register ViewModels
            _container.Singleton<MainViewModel>();
            _container.Singleton<LoginViewModel>();
            _container.Singleton<SingleSpanViewModel>();
            _container.Singleton<SingleSpanView2ViewModel>();
            _container.Singleton<MultiSpanViewModel>();
            _container.Singleton<MultiSpanView2ViewModel>();
            _container.Singleton<MultiSpanView2HelpViewModel>();
            _container.Singleton<MultiSpanHelpViewModel>();
            _container.Singleton<MultiSpanComputeResultViewModel>();
            _container.Singleton<MultiSpanComputeResultHelpViewModel>();
            _container.Singleton<SingleSpanComputingViewModel>();
            _container.Singleton<SingleSpanComputeResultViewModel>();
            _container.Singleton<SingleSpanComputeHelpViewModel>();
            _container.Singleton<SingleSpanView2HelpViewModel>();
            _container.Singleton<SingleSpanComputeResultHelpViewModel>();
        }

        protected override object GetInstance(Type service, string key)
        {
            return _container.GetInstance(service, key);
        }

        protected override IEnumerable<object> GetAllInstances(Type service)
        {
            return _container.GetAllInstances(service);
        }

        protected override void BuildUp(object instance)
        {
            _container.BuildUp(instance);
        }

        protected override void OnStartup(object sender, StartupEventArgs e)
        {
            base.OnStartup(sender, e);
            DisplayRootViewForAsync<LoginViewModel>();
            
        }
    }
}