using System.ComponentModel.DataAnnotations;

namespace itechart.CarRental.Models
{
    public class RegisterAccountModel
    {
        [Required(ErrorMessage = "Role missing")]
        public string Role { get; set; }

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

    public class LoginAccountModel
    {
        [Required(ErrorMessage = "Role missing")]
        public string Role { get; set; }

        [Required(ErrorMessage = "Login missing")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Password missing")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}