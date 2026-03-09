from rest_framework.test import APITestCase
from rest_framework import status


class UserAPITest(APITestCase):
    def test_get_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {'username': 'testuser', 'email': 'test@example.com', 'password': 'password123'}
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TeamAPITest(APITestCase):
    def test_get_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_team(self):
        data = {'name': 'Test Team', 'members': []}
        response = self.client.post('/api/teams/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ActivityAPITest(APITestCase):
    def test_get_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_activity(self):
        data = {'user': 'testuser', 'activity_type': 'running', 'duration': 30.0, 'date': '2024-01-01'}
        response = self.client.post('/api/activities/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LeaderboardAPITest(APITestCase):
    def test_get_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_leaderboard_entry(self):
        data = {'user': 'testuser', 'score': 100}
        response = self.client.post('/api/leaderboard/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class WorkoutAPITest(APITestCase):
    def test_get_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_workout(self):
        data = {'name': 'Test Workout', 'description': 'A test workout', 'exercises': []}
        response = self.client.post('/api/workouts/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
