using System.ComponentModel.DataAnnotations;


namespace itechart.CarRental.Models
{
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