namespace CommunityConnectApi.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        public List<string> Categories { get; set; } = new();
        public string OrganizerId { get; set; }
    }
}
