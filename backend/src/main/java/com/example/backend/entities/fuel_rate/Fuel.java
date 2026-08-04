package com.example.backend.entities.fuel_rate;



import com.example.backend.enums.FuelStatus;



import jakarta.persistence.*;

@Entity
@Table(name = "fuels")
public class Fuel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fuel_name", nullable = false, unique = true)
    private String fuelName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelStatus status;

    public Fuel() {
    }

    public Fuel(Long id, String fuelName, Unit unit, FuelStatus status) {
        this.id = id;
        this.fuelName = fuelName;
        this.unit = unit;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getFuelName() {
        return fuelName;
    }

    public void setFuelName(String fuelName) {
        this.fuelName = fuelName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public FuelStatus getStatus() {
        return status;
    }

    public void setStatus(FuelStatus status) {
        this.status = status;
    }

    // Convenience setter accepting String values (e.g. from DTOs/services).
    // It converts the provided string to the FuelStatus enum if possible.
    public void setStatus(String status) {
        if (status == null) {
            this.status = null;
            return;
        }

        try {
            this.status = FuelStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException ex) {
            // If the provided string doesn't match enum constants, rethrow a clear exception
            throw new IllegalArgumentException("Invalid FuelStatus value: " + status, ex);
        }
    }
}