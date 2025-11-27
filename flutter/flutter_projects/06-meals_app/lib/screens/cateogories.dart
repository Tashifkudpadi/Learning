import 'package:flutter/material.dart';
import 'package:meals_app/data/dummy_data.dart';
import 'package:meals_app/models/category.dart';
import 'package:meals_app/models/meal.dart';
import 'package:meals_app/screens/meals.dart';
import 'package:meals_app/widgets/catogory_grid_item.dart';

class CategoriesScreen extends StatelessWidget {
  const CategoriesScreen({super.key, required this.onToggleFavorite});
  final void Function(Meal meal) onToggleFavorite;

  void _selectCategory(BuildContext context, Category category) {
    final filteredMeal = dummyMeals
        .where((meal) => meal.categories.contains(category.id))
        .toList();
    // Navigator.push(context, route)
    // or
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (ctx) => MealsScreen(
          meals: filteredMeal,
          title: category.title,
          onToggleFavorite: onToggleFavorite,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GridView(
      padding: EdgeInsets.all(22),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 3 / 2,
        crossAxisSpacing: 20,
        mainAxisSpacing: 20,
      ),
      // itemBuilder: (context, index) {
      //   return Card(child: Text("Category $index"));
      // },
      children: availableCategories
          .map(
            (category) => CatogoryGridItem(
              category: category,
              onSelectCatogory: () {
                _selectCategory(context, category);
              },
            ),
          )
          .toList(),
      //  or
      //for(final category in availableCategories)
      //  CatogoryGridItem(category: category),
    );
  }
}
