import { ref } from 'vue';
import apiClient from '@/services/api';

export default function useContractDetails() {
    const contract = ref(null);
    const loadingContract = ref(true);
    const errorContract = ref(null);

    const fetchContractDetails = async (contractId) => {
        try {
            const response = await apiClient.get(`/contracts/staff/contracts/${contractId}`);
            contract.value = response.data;
        } catch (error) {
            errorContract.value = 'Failed to fetch contract details.';
        } finally {
            loadingContract.value = false;
        }
    };

    return { contract, loadingContract, errorContract, fetchContractDetails };
}
