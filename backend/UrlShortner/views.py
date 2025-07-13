from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponseRedirect, JsonResponse, Http404
from .models import ShortURL
from .serializers import ShortURLSerializer
from django.views import View
from .utils import generate_code

class ShortenURLView(APIView):
    def post(self, request):
        # print("Entered post method")
        serializer = ShortURLSerializer(data=request.data)
        if serializer.is_valid():
            code = generate_code()
            while ShortURL.objects.filter(short_code=code).exists():
                code = generate_code()
            short_url = ShortURL.objects.create(
                original_url=serializer.validated_data['original_url'],
                short_code=code
            )
            host = request.get_host()
            return Response({"short_url": f"http://{host}/{short_url.short_code}"})
        # print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=400)

class RedirectView(View):
    def get(self, request, code):
        try:
            # print("Entered redirect")
            obj = ShortURL.objects.get(short_code=code)
            obj.click_count += 1  
            obj.save()
            return HttpResponseRedirect(obj.original_url)
        except ShortURL.DoesNotExist:
            raise Http404("Short URL not found")


class AnalyticsView(APIView):
    def get(self, request, code):
        try:
            obj = ShortURL.objects.get(short_code=code)
            return JsonResponse({"click_count": obj.click_count})
        except ShortURL.DoesNotExist:
            return JsonResponse({"error": "Not found"}, status=404)