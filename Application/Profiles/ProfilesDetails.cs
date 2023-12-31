using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ProfilesDetails
    {
        public class ProfilesDetailsQuery : IRequest<Result<Profile>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<ProfilesDetailsQuery, Result<Profile>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Profile>> Handle(ProfilesDetailsQuery request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .ProjectTo<Profile>(_mapper.ConfigurationProvider, 
                        new {currentUsername = _userAccessor.GetUsername()})
                    .SingleOrDefaultAsync(x => x.Username == request.Username);

                if (user == null) return null;

                return Result<Profile>.Success(user);
            }
        }
    }
}