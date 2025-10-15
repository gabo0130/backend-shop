import { OrderUseCase } from './order.use-case';
import type { OrderRepository } from '../../../domain/repositories/order.repository';
import { InventoryService } from 'src/domain/services';

describe('OrderUseCase Constructor', () => {
  it('should create an instance with provided dependencies', () => {
    const mockOrderRepository = {} as OrderRepository;
    const mockInventoryService = {} as InventoryService;

    const useCase = new OrderUseCase(mockOrderRepository, mockInventoryService);

    expect(useCase).toBeInstanceOf(OrderUseCase);
    // @ts-expect-error: accessing private property for test
    expect(useCase.orderRepository).toBe(mockOrderRepository);
    // @ts-expect-error: accessing private property for test
    expect(useCase.inventoryService).toBe(mockInventoryService);
  });
});
