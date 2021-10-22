using System.ComponentModel.DataAnnotations;

namespace itechart.CarRental.Models
{
    public class RegisterUserModel
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "Login missing")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Password missing")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Does not match password")]
        public string ConfirmPassword { get; set; }

        public string PhoneNumber { get; set; }
    }

    public class LoginUserModel
    {
        [Required(ErrorMessage = "Login missing")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Password missing")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}