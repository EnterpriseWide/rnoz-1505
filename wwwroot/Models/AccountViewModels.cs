using System;
using System.Collections.Generic;

namespace ewide.web.Models
{
    // Models returned by AccountController actions.

    public class ExternalLoginViewModel
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public string State { get; set; }
    }

    public class ManageInfoViewModel
    {
        public string LocalLoginProvider { get; set; }
        public string Email { get; set; }
        public IEnumerable<UserLoginInfoViewModel> Logins { get; set; }
        public IEnumerable<ExternalLoginViewModel> ExternalLoginProviders { get; set; }
    }

    public class UserInfoViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Position { get; set; }
        public string CoachingExperience { get; set; }
        public string WorkExperience { get; set; }
        public List<string> Roles { get; set; }

        public string Phone { get; set; }
        public string Company { get; set; }

        public string Avatar { get; set; }
        public string AvatarFileUrl { get; set; }
        public string ABN { get; set; }
        public string BusinessName { get; set; }
        public string Address { get; set; }
    }

    public class UserLoginInfoViewModel
    {
        public string LoginProvider { get; set; }

        public string ProviderKey { get; set; }
    }
}
