using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new ProfilesDetails.ProfilesDetailsQuery { Username = username }));
        }

        [HttpPut]
        public async Task<IActionResult> Edit(ProfilesEdit.ProfilesEditCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetUserActivities(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ProfilesListActivities.ProfilesListActivitiesQuery
            { Username = username, Predicate = predicate }));
        }
    }
}