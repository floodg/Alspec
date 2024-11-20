using Alspec.Models;

namespace Alspec.Infrastructure.Interfaces
{
    public interface IJobRepository
    {
        Task<IEnumerable<Job>> GetJobsAsync();
        Task<Job> GetJobByIdAsync(int jobId);
        Task AddJobAsync(Job job);
    }
}
