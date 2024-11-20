namespace Alspec.Models
{
    public class Job
    {
        public int Id { get; set; }  // Unique identifier for the job
        public string Title { get; set; }  // Job title
        public string Description { get; set; }  // Job description
        public List<SubItem> SubItems { get; set; }  // Associated sub-items
    }
}
