using System;
using OmniBudget.Core.Users.Entities;

namespace OmniBudget.Core.Categories.Entities
{
    public class Category
    {
        public long Id { get; set; }
        public Guid Guid { get; set; }
        public User Owner { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Category ParentCategory { get; set; }
    }
}