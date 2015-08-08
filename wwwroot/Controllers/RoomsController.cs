using ewide.web.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Dynamic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize]
    [RoutePrefix("api/rooms")]
    public class RoomsController : BaseApiController
    {
        public IEnumerable<RoomDto> GetRooms()
        {
            return AppDb.Room
                .Select(i => new RoomDto
                {
                    Id = i.Id,
                    Name = i.Name,
                });
        }

        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(GetRoomResponse))]
        public async Task<IHttpActionResult> GetRoom(int id)
        {
            var room = await AppDb.Room.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }
            var response = new GetRoomResponse
            {
                Item = room
            };
            response.UsageCount = AppDb.CoachingSessions
                .Count(i => i.RoomId == room.Id);
            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRoom(int id, Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != room.Id)
            {
                return BadRequest();
            }

            AppDb.Entry(room).State = EntityState.Modified;

            try
            {
                await AppDb.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(Room))]
        public async Task<IHttpActionResult> PostRoom(Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppDb.Room.Add(room);
            await AppDb.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = room.Id }, room);
        }

        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(Room))]
        public async Task<IHttpActionResult> DeleteRoom(int id)
        {
            Room room = await AppDb.Room.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            AppDb.Room.Remove(room);
            await AppDb.SaveChangesAsync();

            return Ok(room);
        }

        private bool RoomExists(int id)
        {
            return AppDb.Room.Count(e => e.Id == id) > 0;
        }

        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(GetRoomsForAdminResponse))]
        [Route("ForAdmin")]
        public IHttpActionResult GetRoomsForAdmin(int pageNumber = 1, int pageSize = 25, String sort = "CreatedAt desc")
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var rooms = (IQueryable<Room>)AppDb.Room;
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

    public class RoomDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class GetRoomResponse
    {
        public int UsageCount { get; set; }
        public Room Item { get; set; }
    }
    public class GetRoomsForAdminResponse
    {
        public int TotalItems { get; set; }
        public List<Room> Items { get; set; }
    }
}