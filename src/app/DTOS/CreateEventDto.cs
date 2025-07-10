namespace CommunityConnectApi.Dtos
{
    public class CreateEventDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public List<string> Categories { get; set; }
    }
}
