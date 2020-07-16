from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


@api_view(['DELETE'])
def DeleteToken(request):
	print(request)
	if request.method == 'DELETE':
		Token.objects.get(user=request.user).delete()
		return Response({'logout status': 'successful'})