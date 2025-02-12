<template>
    <div class="bg-white shadow-md rounded-lg h-full border border-gray-200">
        <div class="p-6">
            <!-- Header Section: Building Number & Address -->
            <div class="flex justify-between items-center mb-4">
                <h5 class="text-lg font-semibold">{{ $t('message.building') }} {{ building.building_number }}</h5>
                <small class="text-gray-500">{{ building.address }}</small>
            </div>

            <!-- Building Details Section -->
            <div class="mb-4">
                <ul class="space-y-2">
                    <li class="flex items-center">
                        <i class="bi bi-box mr-2"></i>
                        {{ $t('message.block') }}: <strong class="ml-1">{{ building.block_number }}</strong>
                    </li>
                    <li class="flex items-center">
                        <i class="bi bi-building mr-2"></i>
                        {{ $t('message.floors') }}: <strong class="ml-1">{{ building.floor_count }}</strong>
                    </li>
                    <li class="flex items-center">
                        <i class="bi bi-house mr-2"></i>
                        {{ $t('message.apartments') }}: <strong class="ml-1">{{ building.apartment_count }}</strong>
                    </li>
                    <li class="flex items-center">
                        <i class="bi bi-door-closed mr-2"></i>
                        {{ $t('message.entrances') }}: <strong class="ml-1">{{ building.entrance_count }}</strong>
                    </li>
                </ul>
            </div>

            <!-- Staff Section -->
            <div class="border-t border-gray-200 pt-4">
                <h6 class="text-sm text-gray-600 font-medium mb-2">{{ $t('message.staff_assigned') }}</h6>
                <p class="mb-1">
                    <i class="bi bi-person mr-2"></i>
                    {{ building.staff_details.first_name }} {{ building.staff_details.last_name }}
                </p>
            </div>

            <!-- Footer Section: Last Updated -->
            <div class="text-gray-500 mt-4">
                <small>{{ $t('message.created_at') }}: {{ formatDate(building.created_at) }}</small>
            </div>

            <!-- Manage Building Button -->
            <RouterLink :to="`/building/${building.id}/apartments`"
                class="block bg-blue-600 text-white text-center mt-6 py-2 rounded hover:bg-blue-700">
                {{ $t('message.manage_building') }}
            </RouterLink>
        </div>
    </div>
</template>

<script setup>

// Props
const props = defineProps({
    building: Object,
});

// Helper function to format the date
const formatDate = (date) => {
    return new Date(date).toLocaleString();
};
</script>

<style scoped>
/* No custom CSS is needed as all styles are handled by Tailwind CSS */
</style>