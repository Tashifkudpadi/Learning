import 'package:flutter/material.dart';
import 'package:meals_app/models/meal.dart';
import 'package:meals_app/screens/cateogories.dart';
// import 'package:meals_app/screens/favourites_screen.dart';
import 'package:meals_app/screens/meals.dart';

class TabsScreen extends StatefulWidget {
  const TabsScreen({super.key});

  @override
  State<TabsScreen> createState() => _TabsScreenState();
}

class _TabsScreenState extends State<TabsScreen> {
  int selectedPageIndex = 0;
  final List<Meal> favoriteMeals = [];

  void _showInfoMsg(String msg) {
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  void toggleFavoriteMeal(Meal meal) {
    final isExisting = favoriteMeals.contains(meal);
    if (isExisting) {
      setState(() {
        favoriteMeals.remove(meal);
      });
      _showInfoMsg('Meal removed from favorites');
    } else {
      setState(() {
        favoriteMeals.add(meal);
      });
      _showInfoMsg('Meal added to favorites');
    }
  }

  void selectPage(int index) {
    setState(() {
      selectedPageIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    var activePageTitle = "Categories";
    Widget activeScreen = CategoriesScreen(
      onToggleFavorite: toggleFavoriteMeal,
    );
    if (selectedPageIndex == 1) {
      activeScreen = MealsScreen(
        meals: favoriteMeals,
        onToggleFavorite: toggleFavoriteMeal,
      );
      activePageTitle = "Your Favorites";
    }
    return Scaffold(
      appBar: AppBar(title: Text(activePageTitle)),
      body: activeScreen,
      bottomNavigationBar: BottomNavigationBar(
        onTap: selectPage,
        currentIndex: selectedPageIndex,
        items: [
          BottomNavigationBarItem(
            label: 'Categories',
            icon: Icon(Icons.category),
          ),
          BottomNavigationBarItem(
            label: 'Favorites',
            icon: Icon(Icons.favorite),
          ),
        ],
      ),
    );
  }
}
