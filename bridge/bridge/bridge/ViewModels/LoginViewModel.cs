using Caliburn.Micro;
using System;
using System.IO;
using System.Windows;
using System.Security;
using System.Threading.Tasks;

namespace bridge.ViewModels
{
    public class LoginViewModel : Screen
    {
        private readonly IWindowManager _windowManager;
        private string _username = string.Empty;
        private string _password = string.Empty;
        private bool _isLoggingIn = false;
        private double _windowWidth = 400;
        private double _windowHeight = 300;
        private WindowState _windowState = WindowState.Normal;
        private string _errorMessage = string.Empty;
        private string _captchaCode = string.Empty;
        private string _captchaText = string.Empty;
        private Random _random = new Random();

        public LoginViewModel(IWindowManager windowManager)
        {
            _windowManager = windowManager;
            DisplayName = "用户登录";
            
            // 初始化时生成验证码
            RefreshCaptcha();
        }

        public string Username
        {
            get => _username;
            set
            {
                _username = value;
                NotifyOfPropertyChange(() => Username);
                NotifyOfPropertyChange(() => CanLogin);
            }
        }

        public string Password
        {
            get => _password;
            set
            {
                _password = value;
                NotifyOfPropertyChange(() => Password);
                NotifyOfPropertyChange(() => CanLogin);
            }
        }

        public string CaptchaCode
        {
            get => _captchaCode;
            set
            {
                _captchaCode = value;
                NotifyOfPropertyChange(() => CaptchaCode);
            }
        }

        public string CaptchaText
        {
            get => _captchaText;
            set
            {
                _captchaText = value;
                NotifyOfPropertyChange(() => CaptchaText);
                NotifyOfPropertyChange(() => CanLogin);
            }
        }

        public bool IsLoggingIn
        {
            get => _isLoggingIn;
            set
            {
                _isLoggingIn = value;
                NotifyOfPropertyChange(() => IsLoggingIn);
                NotifyOfPropertyChange(() => CanLogin);
            }
        }

        public string ErrorMessage
        {
            get => _errorMessage;
            set
            {
                _errorMessage = value;
                NotifyOfPropertyChange(() => ErrorMessage);
                NotifyOfPropertyChange(() => HasError);
            }
        }

        public bool HasError => !string.IsNullOrEmpty(ErrorMessage);

        public bool CanLogin => !string.IsNullOrEmpty(Username) &&
                               !string.IsNullOrEmpty(Password) &&
                               !string.IsNullOrEmpty(CaptchaText) &&
                               !IsLoggingIn;
        public double WindowWidth
        {
            get => _windowWidth;
            set
            {
                _windowWidth = value;
                NotifyOfPropertyChange(() => WindowWidth);
            }
        }

        public double WindowHeight
        {
            get => _windowHeight;
            set
            {
                _windowHeight = value;
                NotifyOfPropertyChange(() => WindowHeight);
            }
        }

        public WindowState WindowState
        {
            get => _windowState;
            set
            {
                _windowState = value;
                NotifyOfPropertyChange(() => WindowState);
            }
        }

        public void SetWindowSize(double width, double height, WindowState state = WindowState.Normal)
        {
            WindowWidth = width;
            WindowHeight = height;
            WindowState = state;
        }

        /// <summary>
        /// 生成新的验证码
        /// </summary>
        public void RefreshCaptcha()
        {
            // 生成4位英文字母和数字的组合
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            char[] captchaArray = new char[4];
            
            for (int i = 0; i < 4; i++)
            {
                captchaArray[i] = chars[_random.Next(chars.Length)];
            }
            
            CaptchaCode = new string(captchaArray);
            CaptchaText = string.Empty; // 清空用户输入
        }

        public async void Login()
        {
            IsLoggingIn = true;
            ErrorMessage = string.Empty;

            try
            {
                // 验证验证码
                if (!string.Equals(CaptchaText, CaptchaCode, StringComparison.OrdinalIgnoreCase))
                {
                    ErrorMessage = "验证码错误，请重新输入。";
                    RefreshCaptcha();
                    IsLoggingIn = false;
                    return;
                }

                // 模拟登录过程
                await Task.Delay(1000);

                // 从users.txt文件中读取账号密码
                bool isAuthenticated = await AuthenticateUserAsync(Username, Password);

                if (isAuthenticated)
                {
                    // 登录成功，打开主窗口
                    var mainViewModel = IoC.Get<MainViewModel>();
                    
                    // 获取当前窗口
                    var window = GetView() as Window;
                    double currentWidth = window?.ActualWidth ?? 400;
                    double currentHeight = window?.ActualHeight ?? 300;
                    WindowState currentState = window?.WindowState ?? WindowState.Normal;
                    
                    mainViewModel.SetWindowSize(900, 600, currentState);
                    await _windowManager.ShowWindowAsync(mainViewModel);
                    
                    // 关闭登录窗口
                    await TryCloseAsync();
                }
                else
                {
                    ErrorMessage = "用户名或密码错误，请重试。";
                    RefreshCaptcha();
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = $"登录失败: {ex.Message}";
                RefreshCaptcha();
            }
            finally
            {
                IsLoggingIn = false;
            }
        }

        /// <summary>
        /// 从users.txt文件中验证用户名和密码
        /// </summary>
        private async Task<bool> AuthenticateUserAsync(string username, string password)
        {
            try
            {
                // 获取users.txt文件路径（假设在应用程序根目录）
                string usersFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "users.txt");
                
                // 如果文件不存在，创建默认的admin|admin
                if (!File.Exists(usersFilePath))
                {
                    await File.WriteAllTextAsync(usersFilePath, "admin|admin");
                }
                
                // 读取所有用户信息
                string[] lines = await File.ReadAllLinesAsync(usersFilePath);
                
                // 遍历每一行，检查用户名和密码
                foreach (string line in lines)
                {
                    if (string.IsNullOrWhiteSpace(line))
                        continue;
                        
                    string[] parts = line.Split('|');
                    if (parts.Length == 2)
                    {
                        string storedUsername = parts[0].Trim();
                        string storedPassword = parts[1].Trim();
                        
                        if (username == storedUsername && password == storedPassword)
                        {
                            return true; // 验证成功
                        }
                    }
                }
                
                return false; // 未找到匹配的用户名和密码
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"验证用户时出错: {ex.Message}");
                
                // 如果出错，回退到默认验证方式
                return username == "admin" && password == "admin";
            }
        }

        public void Cancel()
        {
            TryCloseAsync();
        }
    }
} 