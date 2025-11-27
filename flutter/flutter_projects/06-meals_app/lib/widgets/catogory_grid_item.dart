import 'package:flutter/material.dart';
import 'package:meals_app/models/category.dart';

class CatogoryGridItem extends StatelessWidget {
  const CatogoryGridItem({
    super.key,
    required this.category,
    required this.onSelectCatogory,
  });

  final Category category;
  final void Function() onSelectCatogory;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onSelectCatogory,
      splashColor: Theme.of(context).colorScheme.primary,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              category.color.withValues(alpha: .55),
              category.color.withValues(alpha: .9),
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(
          category.title,
          style: Theme.of(context).textTheme.titleLarge!.copyWith(
            color: Theme.of(context).colorScheme.onSurface,
          ),
        ),
      ),
    );
  }
}
