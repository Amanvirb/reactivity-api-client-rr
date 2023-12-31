using System;

namespace Domain
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public AppUser AppUser { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; } = DateTime.Now.AddDays(7);
        public bool IsExpired => DateTime.Now >= Expires;
        public DateTime? Revoked { get; set; }
        public bool IsActive => Revoked == null && !IsExpired;
    }
}