
using Alspec.Models;

namespace Alspec.Infrastrucure.Interfaces
{
    public interface IJobRepository
    {
        Task<IEnumerable<Job>> GetJobsAsync();
        Task<Job> GetJobByIdAsync(int jobId);
        Task AddJobAsync(Job job);
    }
}
