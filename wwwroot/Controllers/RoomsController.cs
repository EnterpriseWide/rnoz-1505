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
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/rooms")]
    public class RoomsController : BaseApiController
    {
        // GET: api/Room
        public IQueryable<Room> GetRooms()
        {
            return AppDb.Room;
        }

        // GET: api/Room/5
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

        // PUT: api/Room/5
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

        // POST: api/Room
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

        // DELETE: api/Room/5
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