package com.hackathon.backend.locationsservice.Repositories;
import com.hackathon.backend.locationsservice.Domain.Feature;
import com.hackathon.backend.locationsservice.Domain.Verification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VerificationRepository extends JpaRepository<Verification, UUID> {
    List<Verification> findAllById(UUID locationId);
}
