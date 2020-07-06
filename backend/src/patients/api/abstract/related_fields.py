from rest_framework.relations import RelatedField


class HistoryField(RelatedField):

	def to_representation(self, value):
		return {
			'timestamp': value.timestamp,
			'history': value.history,
			'duration': value.duration,
			'description': value.description,
		}
