using Alspec.Infrastrucure.Interfaces;
using Alspec.Models;
using Microsoft.AspNetCore.Mvc;

namespace Alspec.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly IJobRepository _jobRepository;

        public JobsController(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        // GET /api/jobs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
        {
            var jobs = await _jobRepository.GetJobsAsync();
            return Ok(jobs);
        }

        // POST /api/jobs (Optional)
        [HttpPost]
        public async Task<ActionResult<Job>> CreateJob([FromBody] Job job)
        {
            await _jobRepository.AddJobAsync(job);
            return CreatedAtAction(nameof(GetJobs), new { id = job.Id }, job);
        }
    }

}
