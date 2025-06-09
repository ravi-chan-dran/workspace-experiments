import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/photo.dart';
import '../services/auth_service.dart';
import '../services/image_service.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String search = '';

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context, listen: false);
    final imageService = ImageService();

    return Scaffold(
      appBar: AppBar(
        title: const Text('PoseVault'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: auth.signOut,
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(56),
          child: Padding(
            padding: const EdgeInsets.all(8),
            child: TextField(
              decoration: const InputDecoration(
                hintText: 'Search',
                fillColor: Colors.white,
                filled: true,
                prefixIcon: Icon(Icons.search),
              ),
              onChanged: (val) => setState(() => search = val.trim()),
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => imageService.uploadImage(auth.user!.uid, 'default', []),
        child: const Icon(Icons.add_a_photo),
      ),
      body: StreamBuilder<QuerySnapshot>(
        stream: FirebaseFirestore.instance
            .collection('images')
            .where('userId', isEqualTo: auth.user!.uid)
            .orderBy('createdAt', descending: true)
            .snapshots(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }
          final photos = snapshot.data!.docs
              .map((doc) => Photo.fromMap(doc.id, doc.data() as Map<String, dynamic>))
              .where((p) => search.isEmpty ||
                  p.tags.any((t) => t.contains(search)) ||
                  p.category.contains(search))
              .toList();
          return GridView.builder(
            padding: const EdgeInsets.all(8),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: 4,
              mainAxisSpacing: 4,
            ),
            itemCount: photos.length,
            itemBuilder: (context, index) {
              return Image.network(photos[index].url, fit: BoxFit.cover);
            },
          );
        },
      ),
    );
  }
}
