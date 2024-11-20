using System.ComponentModel.DataAnnotations;

namespace Alspec.Models
{
    public class SubItem
    {
        [Key]  // Set ItemId as the primary key
        public int ItemId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }

        public int JobId { get; set; }  // Foreign key (integer) linking to Job
    }
}
