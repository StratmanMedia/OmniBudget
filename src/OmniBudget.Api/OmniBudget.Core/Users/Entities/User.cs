using System;

namespace OmniBudget.Core.Users.Entities
{
    public class User
    {
        public long Id { get; set; }
        public Guid Guid { get; set; }
        public string Username { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
        public string EmailAddress { get; set; }
    }
}