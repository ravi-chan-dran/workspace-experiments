class Photo {
  final String id;
  final String url;
  final String category;
  final List<String> tags;

  Photo({required this.id, required this.url, required this.category, required this.tags});

  factory Photo.fromMap(String id, Map<String, dynamic> data) {
    return Photo(
      id: id,
      url: data['url'] ?? '',
      category: data['category'] ?? '',
      tags: List<String>.from(data['tags'] ?? []),
    );
  }
}
