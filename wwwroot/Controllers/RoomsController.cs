using ewide.web.Models;
using ewide.web.Utils;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Dynamic;
using System.Net;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize]
    [RoutePrefix("api/rooms")]
    public class RoomsController : BaseApiController
    {
        [ResponseType(typeof(GetRoomsForAdminResponse))]
        [Authorize(Roles = "Admin")]
        [Route("ForAdmin")]
        public IHttpActionResult GetRoomsForAdmin(int pageNumber = 1, int pageSize = 25, String sort = "CreatedAt desc")
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var rooms = (IQueryable<Room>) AppDb.Room;
            if (String.IsNullOrEmpty(sort) || sort == "null")
            {
                rooms = rooms.OrderByDescending(i => i.CreatedAt);
            }
            else
            {
                if (sort.EndsWith(","))
                {
                    sort = sort.TrimEnd(',');
                }
                rooms = rooms.OrderBy(sort);
            }
            var count = rooms.Count();
            rooms = rooms
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);
            return Ok(new GetRoomsForAdminResponse
            {
                TotalItems = count,
                Items = rooms.ToList(),
            });
        }

    }

    public class GetRoomsForAdminResponse
    {
        public int TotalItems { get; set; }
        public List<Room> Items { get; set; }
    }
}
