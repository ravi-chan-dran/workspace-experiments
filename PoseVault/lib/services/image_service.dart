import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:image_picker/image_picker.dart';

class ImageService {
  final FirebaseStorage _storage = FirebaseStorage.instance;
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> uploadImage(String userId, String category, List<String> tags) async {
    final picker = ImagePicker();
    final picked = await picker.pickImage(source: ImageSource.gallery);
    if (picked == null) return;
    final file = File(picked.path);
    final filename = '${DateTime.now().millisecondsSinceEpoch}_${picked.name}';
    final ref = _storage.ref('images/$userId/$filename');
    await ref.putFile(file);
    final url = await ref.getDownloadURL();
    await _db.collection('images').add({
      'userId': userId,
      'url': url,
      'category': category,
      'tags': tags,
      'createdAt': FieldValue.serverTimestamp(),
    });
  }
}
