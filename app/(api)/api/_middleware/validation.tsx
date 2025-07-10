;
// app/(api)/_middleware/validation.ts
import { NextRequest } from 'next/server';
import { MiddlewareContext, MiddlewareFunction } from 'app/(api)/api/_middleware/compose';


interface ValidationRule {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'email' | 'boolean';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export const validationMiddleware = (
  rules: ValidationRule[]
): MiddlewareFunction => {
  return async (request: NextRequest, context: MiddlewareContext) => {
    try {
      const body = await request.json().catch(() => ({}));
      const errors: string[] = [];

      for (const rule of rules) {
        const value = body[rule.field];

        // Check required fields
        if (
          rule.required &&
          (value === undefined || value === null || value === '')
        ) {
          errors.push(`${rule.field} is required`);
          continue;
        }

        // Skip validation if field is not present and not required
        if (value === undefined || value === null) {
          continue;
        }

        // Type validation
        if (rule.type) {
          if (rule.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              errors.push(`${rule.field} must be a valid email`);
            }
          } else if (rule.type === 'number') {
            if (isNaN(Number(value))) {
              errors.push(`${rule.field} must be a number`);
            }
          } else if (rule.type === 'boolean') {
            if (typeof value !== 'boolean') {
              errors.push(`${rule.field} must be a boolean`);
            }
          } else if (rule.type === 'string') {
            if (typeof value !== 'string') {
              errors.push(`${rule.field} must be a string`);
            }
          }
        }

        // Length validation
        if (typeof value === 'string') {
          if (rule.minLength && value.length < rule.minLength) {
            errors.push(
              `${rule.field} must be at least ${rule.minLength} characters`
            );
          }
          if (rule.maxLength && value.length > rule.maxLength) {
            errors.push(
              `${rule.field} must be no more than ${rule.maxLength} characters`
            );
          }
        }

        // Pattern validation
        if (rule.pattern && typeof value === 'string') {
          if (!rule.pattern.test(value)) {
            errors.push(`${rule.field} format is invalid`);
          }
        }
      }

      if (errors.length > 0) {
        return {
          success: false,
          error: `Validation failed: ${errors.join(', ')}`,
        };
      }

      return {
        success: true,
        context: {
          ...context,
          validation: {
            isValid: true,
            errors: [],
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Invalid JSON body',
      };
    }
  };
};

export function validateRequest(rules: ValidationRule[]) {
  return validationMiddleware(rules);
}
