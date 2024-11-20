using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alspec.Infrastrucure.Interfaces;
using Alspec.Models;
using Microsoft.EntityFrameworkCore;

namespace Alspec.Repository
{
    public class JobRepository : IJobRepository
    {
        private readonly JobManagementContext _context;

        public JobRepository(JobManagementContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Job>> GetJobsAsync()
        {
            return await _context.Jobs.Include(j => j.SubItems).ToListAsync();
        }

        public async Task<Job> GetJobByIdAsync(int jobId)
        {
            return await _context.Jobs.Include(j => j.SubItems)
                                      .FirstOrDefaultAsync(j => j.Id == jobId);
        }

        public async Task AddJobAsync(Job job)
        {
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
        }
    }
}
